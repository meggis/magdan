/* eslint-disable */
import { UseTableColumnOptions } from 'react-table';

declare module 'react-table' {
	export interface ColumnInterface<D extends object = {}> extends UseTableColumnOptions<D> {
		getSortByToggleProps?: HeaderPropGetter<object> | undefined;
		toggleSortBy?: any | undefined;
		isSortedDesc?: HeaderGroup<object> | undefined;
		isSorted?: boolean | undefined;
	}

	export interface TableInstance<D extends Record<string, unknown> = Record<string, unknown>>
		extends UseColumnOrderInstanceProps<D>,
			UseExpandedInstanceProps<D>,
			UseFiltersInstanceProps<D>,
			UseGlobalFiltersInstanceProps<D>,
			UseGroupByInstanceProps<D>,
			UsePaginationInstanceProps<D>,
			UseRowSelectInstanceProps<D>,
			UseRowStateInstanceProps<D>,
			UseSortByInstanceProps<D> {}

	export interface TableState<D extends Record<string, unknown> = Record<string, unknown>>
		extends UseColumnOrderState<D>,
			UseExpandedState<D>,
			UseFiltersState<D>,
			UseGlobalFiltersState<D>,
			UseGroupByState<D>,
			UsePaginationState<D>,
			UseResizeColumnsState<D>,
			UseRowSelectState<D>,
			UseRowStateState<D>,
			UseSortByState<D> {}
}
