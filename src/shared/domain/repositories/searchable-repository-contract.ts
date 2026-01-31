import { Entity } from "../entities/entity";
import { RepositoryContract } from "./repository-contract";

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
}

export type SearchResultProps<E extends Entity, Filter> = {
  items: E[];
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
  sort: string | null;
  sortDir: SortDirection | null;
  filter: Filter | null;
}

export class SearchParams {
  protected _page: number;
  protected _perPage: number;
  protected _sort: string | null;
  protected _sortDir: SortDirection | null;
  protected _filter: string | null;

  constructor(props: SearchProps) {
    this.page = props.page ?? 1;
    this.perPage = props.perPage ?? 15;
    this.sort = props.sort ?? null;
    this.sortDir = props.sortDir ?? null;
    this.filter = props.filter ?? null;
  }

  get page(): number {
    return this._page;
  }

  private set page(value: number) {
    let _page = +value;
    if (_page <= 0 || isNaN(_page) || _page > 100 || typeof _page !== 'number') {
      _page = 1;
    }
    this._page = _page;
  }

  get perPage(): number {
    return this._perPage;
  }

  private set perPage(value: number) {
    let _perPage = +value;
    if (_perPage <= 0 || isNaN(_perPage) || _perPage > 100 || typeof _perPage !== 'number') {
      _perPage = 15;
    }
    this._perPage = _perPage;
  }

  get sort(): string | null {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort = value === null || value === undefined || value === '' ? null : String(value);
  }

  get sortDir(): SortDirection | null {
    return this._sortDir;
  }

  private set sortDir(value: SortDirection | null) {
   if (!this.sort){
    this._sortDir = null;
    return;
   }

   const dir = String(value).toLowerCase() as SortDirection;
   if (dir !== 'asc' && dir !== 'desc') {
    this._sortDir = 'desc';
    return;
   }

   this._sortDir = dir;
  }

  get filter(): string | null {
    return this._filter;
  }

  private set filter(value: string | null) {
    this._filter = value === null || value === undefined || value === '' ? null : String(value);
  }
}

export class SearchResult<E extends Entity, Filter> {
  readonly items: E[];
  readonly total: number;
  readonly currentPage: number;
  readonly perPage: number;
  readonly lastPage: number;
  readonly sort: string | null;
  readonly sortDir: SortDirection | null;
  readonly filter: Filter | null;

  constructor(props: SearchResultProps<E, Filter>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(this.total / this.perPage);
    this.sort = props.sort ?? null;
    this.sortDir = props.sortDir ?? null;
    this.filter = props.filter ?? null;
  }

  toJSON(forceEntity = false): SearchResultProps<E, Filter> {
    return {
      items: this.items.map(item => forceEntity ? item : item.toJSON()),
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDir: this.sortDir,
      filter: this.filter,
    }
  }
}

export interface SearchableRepositoryContract<
E extends Entity,
SearchInput,
SearchOutput,
> extends RepositoryContract<E> {
  search(params: SearchParams): Promise<SearchOutput>;
} 