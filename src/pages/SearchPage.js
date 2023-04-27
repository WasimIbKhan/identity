
import React, { useCallback } from "react";
import {getFirestore, getDocs, collection, where, query } from "firebase/firestore"; 
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import './SearchPage.css'
import IdentityComp from '../components/UI/IdentityComp/IdentityComp';
import * as identyFunc from '../store/actions/identities';

import { useNavigate } from 'react-router-dom';

import Identity from '../models/identity'

const searchClient = algoliasearch('6VHY9J9IO1', 'f9a3e5ee535b0929dd88ff52f79ade3d');

const SearchPage = () => (
  <InstantSearch searchClient={searchClient} indexName="USERS">
    <SearchBox />
    <Hits hitComponent={Hit} />
  </InstantSearch>
);

function Hit({ hit }) {
  const navigate = useNavigate()
      return (
        <div style={{marginLeft: '30px'}} onClick={() => fetchUserIdentity(hit.objectID, navigate)}>
            <IdentityComp identity={hit}/>
        </div>
    );
  }

async function fetchUserIdentity(userId, navigate) {
    const db = getFirestore()
    
    let user = new Identity();

    const q = await query(collection(db, "identities"), where("identity_type", "==", "Public"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      user = new Identity(
          doc.id,
          doc.data().identity_name,
          doc.data().identity_type,
          doc.data().identity_image
        )
    });

    navigate("/dashboard/search/searched-user", {
      state: { currentIdentity: user, userId: userId},
    });
  }

export default SearchPage;