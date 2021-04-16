import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import Home from '../pages/Home';
import Teams from '../pages/Teams';
import ResourceCard from '../components/ResourceCard';
import NoResourcesFound from '../components/NoResourcesFound';

const SearchNav = (props) => {
  const teamSearch = props.location.state.search.team;
  const resourceSearch = props.location.state.search.resourceSearch;

  const allInitialResources = props.location.state.resources;

  const [_key, setKey] = useState('');
  const defaultKey = 'Teams';

  useLayoutEffect(() => {
    setKey(resourceSearch.length && !teamSearch.length ? 'Resources' : 'Teams')
    console.log("props.location.state", props.location.state)
  }, [props])

  return (
    <div>
      <Tabs defaultActiveKey={resourceSearch.length && !teamSearch.length ? 'Resources' : 'Teams'}
        activeKey={_key.length && _key !== defaultKey ? _key : defaultKey}
        id="controlled-tab-example"
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="Teams" title="Teams">
          <br></br>
          {teamSearch.length ? <Teams teams={teamSearch} /> : <NoResourcesFound type={'Teams'} />}
        </Tab>
        <Tab eventKey="Resources" title="Resources">
          <br></br>
          {resourceSearch.length ? <ResourceCard resources={resourceSearch} /> : <NoResourcesFound type={'Resources'} />}
        </Tab>
      </Tabs>
    </div>
  );
}

export default SearchNav;
