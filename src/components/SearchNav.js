import React from 'react'
import { Tabs, Tab} from 'react-bootstrap';
import Home from '../pages/Home';
import Teams from '../pages/Teams'
import ResourceCard from '../components/ResourceCard'
const SearchNav = (props) => {

  const teamSearch = props.location.state.search.team;
  const resourceSearch = props.location.state.search.tags;

    function ControlledTabs() {
      const [key, setKey] = useState('home');
    }
      return (
        <div>
            <Tabs defaultActiveKey="Teams" 
                      id="controlled-tab-example">
                <Tab eventKey="Teams" title="Teams">
                    <Teams teams = {teamSearch} />
                </Tab>
                <Tab eventKey="profile" title="Resources"> 
                <ResourceCard resources= {resourceSearch} ></ResourceCard>
                </Tab>
            </Tabs>
        </div>
      );
}

export default SearchNav
