import Dexie from 'dexie';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export abstract class AbstractStorageService<T extends { id: string }> {
  protected readonly items: Dexie.Table<T>;
  private readonly refresh$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly storage: Dexie, private readonly name: string) {
    this.items = this.storage.table<T>(name);
  }

  async byId(id: string): Promise<T | undefined> {
    return this.items.get({ id });
  }

  async getAll(): Promise<T[]> {
    const result = await this.items.toArray();
    result.forEach(item => this.loadNavigationProperties(item));

    return result;
  }

  getAll$(): Observable<T[]> {
    return this.refresh$.pipe(
      switchMap(_ => this.getAll()),
    );
  }

  async put(data: T[], force: boolean): Promise<void> {
    if (!data) {
      return;
    }
    await this.items.bulkPut(data);
    if (force) {
      // remove items not in list
      const dataShouldBe = data.map(i => i.id);
      const items = (await this.getAll())
        .map(i => i.id)
        .filter(i => dataShouldBe.indexOf(i) === -1);
      await this.items.bulkDelete(items);
    }
    this.refresh$.next(true);
  }

  async bulkAdd(data: T[]): Promise<void> {
    await this.items.bulkAdd(data);
    this.refresh$.next(true);
  }

  async clear(): Promise<void> {
    await this.items.clear();
    this.refresh$.next(true);
  }

  protected abstract loadNavigationProperties(item: T): void;
}
