import React from 'react';
import { ControllerStateAndHelpers } from 'downshift';

import { useHawksearch } from 'components/StoreProvider';
import SearchBoxBase from 'components/ui/SearchBox/SearchBoxBase';
import { Product } from 'models/Autocomplete';
import { CustomSuggestionListProps } from 'models/Autocomplete/CustomSuggestionList';

/**
 * This component is the search input box (with autosuggest) that should be utilized on search pages. For a simple
 * search input box that is meant to be used on non-search pages (or globally), see `GlobalSearchBox`.
 */

interface SearchBoxProps {
	SuggestionList?: React.ComponentType<CustomSuggestionListProps>;
}

function SearchBox({ SuggestionList }: SearchBoxProps) {
	const { store, actor } = useHawksearch();

	function handleSubmit(event: React.KeyboardEvent<HTMLInputElement>, downshift: ControllerStateAndHelpers<Product>) {
		if (event.key === 'Enter') {
			actor.setSearch({
				PageId: undefined,
				CustomUrl: undefined,
				RequestType: 'ImageSearch',
				ImageData: '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',
				Keyword: encodeURIComponent(event.currentTarget.value),
				FacetSelections: undefined,
				IgnoreSpellcheck: false,
			});
		}
	}

	// On Select view all matches from suggestion list
	function handleViewAllMatches(downshift: ControllerStateAndHelpers<Product>) {
		const { inputValue, closeMenu } = downshift;
		actor.setSearch({
			PageId: undefined,
			CustomUrl: undefined,
			Keyword: inputValue || '',
		});
		closeMenu();
	}

	return (
		<div className="hawk__searchBox">
			<SearchBoxBase
				onViewMatches={handleViewAllMatches}
				initialValue={store && store.pendingSearch ? store.pendingSearch.Keyword : ''}
				onSubmit={handleSubmit}
				SuggestionList={SuggestionList}
			/>
		</div>
	);
}

export default SearchBox;
