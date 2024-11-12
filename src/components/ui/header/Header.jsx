import React, { useEffect, useState } from 'react';
import './Header.scss'; 
import Logo from '../../../assests/Images/Logo.png';
import { MenuItem, Select, FormControl } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { fetchSitesList } from '../../../redux/actions/SiteAction';
import { useDispatch, useSelector } from 'react-redux';


const Header = ({ onSiteChange,fetchApiData }) => {
  
  const { sites, loading } = useSelector((state) => state?.sitesData);
  
  const [selectedSite, setSelectedSite] = useState(
    localStorage.getItem('selectedSite') || 'forever21' 
  );
  const dispatch = useDispatch();
  
  const location = useLocation();

 

  const fetchSites = async () => {
    dispatch(fetchSitesList());
  };

  const handleSiteChange = (event) => {
    const newSite = event.target.value;
    setSelectedSite(newSite);
    localStorage.setItem('selectedSite', newSite); 


    if (location.pathname === '/') {
      fetchApiData(newSite);
    }

    if (onSiteChange) {
      onSiteChange(newSite); 
    }
  };


  useEffect(() => {
    fetchSites();
  }, []); 

  useEffect(() => {
    if (location.pathname === '/' && selectedSite) {
      fetchApiData(selectedSite);
    }
  }, [selectedSite, location.pathname]); 

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <header className="header">
      <img src={Logo} className='logo-image-header' alt="Sparc_Logo" />
      <div className="dashboard-controls">
        <FormControl variant="outlined" className="site-select">
          <Select
            labelId="site-select-label"
            id="site-select"
            value={selectedSite}
            onChange={handleSiteChange}
          >
            {!loading && sites?.map((site) => (
              <MenuItem key={site.id} value={site.site}>
                {capitalizeFirstLetter(site.site)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </header>
  );
};

export default Header;