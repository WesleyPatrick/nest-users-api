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

export class SearchParams {
  protected _page: number;
  protected _perPage: number;
  protected _sort: string | null;
  protected _sortDir: SortDirection | null;
  protected _filter: string | null;

  constructor(props: SearchProps) {
    this._page = props.page ?? 1;
    this._perPage = props.perPage ?? 15;
    this._sort = props.sort ?? null;
    this._sortDir = props.sortDir ?? null;
    this._filter = props.filter ?? null;
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


export interface SearchableRepositoryContract<
E extends Entity,
SearchInput,
SearchOutput,
> extends RepositoryContract<E> {
  search(params: SearchParams): Promise<SearchOutput>;
} 