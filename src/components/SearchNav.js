import React, { useEffect, useState } from 'react'
import { Tabs, Tab} from 'react-bootstrap';
import Home from '../pages/Home';
import Teams from '../pages/Teams'
import ResourceCard from '../components/ResourceCard'

const SearchNav = (props) => {

  const teamSearch = props.location.state.search.team;
  const resourceSearch = props.location.state.search.tags;
  const allInitialResources = props.location.state.resources;

//RECEIVING allInitialResources Array from initial load
  
  const [_key, setKey] = useState('Teams');

    // useEffect(() => {
    //   if(!teamSearch && resourceSearch) setKey('Resources')
    //   if(teamSearch && !resourceSearch) setKey('Teams')
    // })

      return (
        <div>
            <Tabs defaultActiveKey={!teamSearch.length ? 'Resources' : 'Teams'}
                  id="controlled-tab-example">
                <Tab eventKey="Teams" title="Teams">
                <br></br>
                    {teamSearch.length ? <Teams teams = {teamSearch} /> : <h3>No search results for 'Teams' found</h3>}
                </Tab>
                <Tab eventKey="Resources" title="Resources"> 
                <br></br>
                {resourceSearch.length ? <ResourceCard resources= {resourceSearch} ></ResourceCard> : <h3>No search results for 'Resources' found</h3>}
                </Tab>
            </Tabs>
        </div>
      );
}

export default SearchNav
