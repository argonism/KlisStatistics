import React from 'react';
import Autosuggest from 'react-autosuggest';

export type SearchFormProps = {
  // onChange: Function,
  onSelected: Function;
  suggestions: Array<Record<string, any>>;
  searchKey: string;
};

const renderInputComponent = inputProps => (
  <div className='inputContainer'>
    <i className='fas fa-search'></i>
    <input {...inputProps} />
  </div>
);

class SearchForm extends React.Component<SearchFormProps, any> {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
    };
  }

  getSuggestionValue = (suggestion): JSX.Element => {
    return suggestion[this.props.searchKey];
  };

  renderSuggestion = (suggestion): JSX.Element => {
    return <span>{suggestion[this.props.searchKey]}</span>;
  };

  getSuggestions = (value): Record<string, any>[] => {
    if (value === '') return this.props.suggestions;
    return this.props.suggestions.filter(
      suggestion => suggestion[this.props.searchKey].toLowerCase().search(value) !== -1,
    );
  };

  onChange = (event, { newValue, method }): void => {
    console.log(method);
    if (method === 'enter') {
      this.props.onSelected(newValue);
      return;
    }
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }): void => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = (): void => {
    this.setState({
      suggestions: [],
    });
  };

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.onSelected(suggestion);
  };

  shouldRenderSuggestions = value => {
    if (value === '') return this.props.suggestions;
    return this.props.suggestions.filter(
      suggestion => suggestion[this.props.searchKey].toLowerCase().search(value) !== -1,
    );
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'search subject',
      value,
      onChange: this.onChange,
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        renderInputComponent={renderInputComponent}
        onSuggestionSelected={this.onSuggestionSelected}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        id={'auto-suggest-input'}
        highlightFirstSuggestion={true}
      />
    );
  }
}

export default SearchForm;
