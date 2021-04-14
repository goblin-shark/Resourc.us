import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Tabs, Tab} from 'react-bootstrap';
import Home from '../pages/Home';
import Teams from '../pages/Teams';
import ResourceCard from '../components/ResourceCard';
import NoResourcesFound from '../components/NoResourcesFound';

const SearchNav = (props) => {

  const teamSearch = props.location.state.search.team;
  const resourceSearch = props.location.state.search.resourceSearch;
  const allInitialResources = props.location.state.resources;

  
  const [_key, setKey] = useState('');
  const [_defaultKey, setDefaultKey] = useState('Teams');


   useLayoutEffect(() => {
    setDefaultKey(resourceSearch.length && ! teamSearch.length ? 'Resources' : 'Teams')
    console.log(_defaultKey)
   }, [props])

      return (
        <div>
            <Tabs defaultActiveKey={_defaultKey}
                  activeKey = {_key.length && _key !== _defaultKey ? _key : _defaultKey}
                  id="controlled-tab-example"
                  onSelect={(k) => setKey(k)}
                  >
                <Tab eventKey="Teams" title="Teams">
                <br></br>
                    {teamSearch.length ? <Teams teams = {teamSearch} /> : <NoResourcesFound type={'teams'}/>}
                </Tab>
                <Tab eventKey="Resources" title="Resources"> 
                <br></br>
                {resourceSearch.length ? <ResourceCard resources= {resourceSearch} ></ResourceCard> : <NoResourcesFound type={'resources'}/>}
                </Tab>
            </Tabs>
        </div>
      );
}

export default SearchNav
