import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Section, Table, Trow, Theader, Tcell, Loader, Legends, LegendsItem } from '../assets/Comparison.styled';

function Comparison() {
  const location = useLocation();
  const [pkgData, setPkgData] = useState(JSON.parse(location.state));
  const [loadStatus, setLoadStatus] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);

  const versionComparison = (curr, latest) => {
  	let color = null;
  	let str = curr;
  	if (curr.charAt(0) === '^') {
  		str = str.substring(1, str.length);
  	}
  	const currVerCat = str.split('.');
  	const latestVerCat = latest.split('.');
		if (parseInt(currVerCat[0]) < parseInt(latestVerCat[0])) {
			color = 'red'
		} else if (parseInt(currVerCat[1]) < parseInt(latestVerCat[1])) {	
			color = 'orange';
		} else if (parseInt(currVerCat[2]) < parseInt(latestVerCat[2])) {	
			color = 'yellow';
		} else {
			color = 'primary';
		}
		return color;
  }

  const getLatestVersions = async () => {
  	for (let item in pkgData.dependencies) {	
  		const endpoint = `https://registry.npmjs.org/${item}`;
		  const res = await fetch(endpoint);
		  const data = await res.json();
		  const versions = data.versions;
		  const versionsData = Object.values(versions);
		  let latestVersion = versionsData.pop();

		  if (latestVersion.version.includes('-')) {
		  	for (let i = versionsData.length - 1; i > 0; i--) {
		  		if (!versionsData[i].version.includes('-')) {
		  			latestVersion = versionsData[i];
		  			break;
		  		}
		  	}
		  }

		  setComparisonData(prevData => ({
		  	...prevData,
		  	[latestVersion.name]: {
		  		...prevData[latestVersion.name],
		  		pkgNewVer: latestVersion.version,
		  		pkgDependencies: latestVersion.dependencies
		  	}
		  }))
  	}
  }

  const loadExistingData = () => {
  	let mappedData = {};
    for (let item in pkgData.dependencies) {
  	  mappedData = {
  	  	...mappedData,
  	  	[item]: {
  	  		pkgCurrVer: pkgData.dependencies[item],
  	  		pkgNewVer: null,
  	  		pkgDependencies: null
  	  	} 
  	  }
    }
    setComparisonData(mappedData);
    setLoadStatus(true);
  }

  useEffect(() => {
  	loadExistingData();
  }, [pkgData]);

  useEffect(() => {
  	getLatestVersions();
  }, [loadStatus]);

  return (
  	<Section>
  	  <Table>
  	  	<thead>	
  	  		<Trow>
		  			<Theader>Package Name</Theader>
		  			<Theader>Current Version</Theader>
		  			<Theader>Latest Version</Theader>
		  			{/*<Theader>Dependencies</Theader>*/}
			  	</Trow>
			  </thead>
			  <tbody>
		  		{
		  		  comparisonData && Object.values(comparisonData).map((item, index) => {
			  			return (
			  			  <Trow key={ `tr_${index}` }>
			  			  	<Tcell>{ Object.keys(comparisonData)[index] }</Tcell>
			  			  	<Tcell $active={ item.pkgNewVer ? versionComparison(item.pkgCurrVer, item.pkgNewVer) : '' }>{ item.pkgCurrVer }</Tcell>
			  			  	<Tcell>{ item.pkgNewVer ? item.pkgNewVer : <Loader></Loader> }</Tcell>
			  			  	{/*<Tcell>
			  			  		{
			  			  			item.pkgDependencies && Object.keys(item.pkgDependencies).map((item2, index2) => {
			  			  				return (
			  			  					<span>{ item2 }</span>
			  			  				)
			  							})
			  			  		}
			  			  	</Tcell>*/}
			  			  </Trow>
			  			)
		  		  })
		  		}
		  	</tbody>
  	  </Table>
  	  <Legends>
  			<LegendsItem>Latest Version</LegendsItem>
  			<LegendsItem>Patch Update</LegendsItem>
  			<LegendsItem>Minor Update</LegendsItem>
  			<LegendsItem>Major Update</LegendsItem>
  		</Legends>
   	</Section>
  );
}

export default Comparison;