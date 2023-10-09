/* eslint-disable */
import { UseTableColumnOptions } from 'react-table';

declare module 'react-table' {
	export interface ColumnInterface<D extends object = {}> extends UseTableColumnOptions<D> {
		getSortByToggleProps?: HeaderPropGetter<object> | undefined;
		toggleSortBy?: any | undefined;
		isSortedDesc?: HeaderGroup<object> | undefined;
		isSorted?: boolean | undefined;
	}
}
