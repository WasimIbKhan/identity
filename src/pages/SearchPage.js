
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import './SearchPage.css'
import IdentityComp from '../components/UI/IdentityComp/IdentityComp';

const searchClient = algoliasearch('6VHY9J9IO1', '04492e7df3f9c75d192177c8af3c8ebf');

const SearchPage = () => (
  <InstantSearch searchClient={searchClient} indexName="IDENTITY">
    <SearchBox />
    <Hits hitComponent={Hit} />
  </InstantSearch>
);

function Hit({ hit }) {
    return (
        <div style={{marginLeft: '30px'}}>
            <IdentityComp identity={hit}/>
        </div>
    );
  }

export default SearchPage;