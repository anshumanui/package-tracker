import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Section, TableWrapper, Table, Trow, Theader, Tcell, Loader, Legends, LegendsItem } from '../assets/Comparison.styled';

function Comparison() {
  const location = useLocation();
  const [pkgData, setPkgData] = useState(JSON.parse(location.state.fileData));
  const [trackerStatus, setTrackerStatus] = useState(JSON.parse(location.state.trackerStatus));
  const [loadStatus, setLoadStatus] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const [comparisonDataD, setComparisonDataD] = useState(null);

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

  	if (trackerStatus) {
  		for (let item in pkgData.devDependencies) {	
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

			  setComparisonDataD(prevData => ({
			  	...prevData,
			  	[latestVersion.name]: {
			  		...prevData[latestVersion.name],
			  		pkgNewVer: latestVersion.version,
			  		pkgDependencies: latestVersion.dependencies
			  	}
			  }))
	  	}
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

    if (trackerStatus) {
    	mappedData = {};
    	for (let item in pkgData.devDependencies) {
	  	  mappedData = {
	  	  	...mappedData,
	  	  	[item]: {
	  	  		pkgCurrVer: pkgData.devDependencies[item],
	  	  		pkgNewVer: null,
	  	  		pkgDependencies: null
	  	  	} 
	  	  }
	    }
	    setComparisonDataD(mappedData);
    }
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
  		<TableWrapper>
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
				  		trackerStatus ? (
				  			<Trow>
				  				<Tcell colSpan="3" $collapse={ trackerStatus }>Dependencies</Tcell>
				  			</Trow>
				  		) : (null)
				  	}
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
			  		{
				  		trackerStatus ? (
				  			<Trow>
				  				<Tcell colSpan="3" $collapse={ trackerStatus }>Dev Dependencies</Tcell>
				  			</Trow>
				  		) : (null)
				  	}
				  	{
			  		  comparisonDataD && Object.values(comparisonDataD).map((item, index) => {
				  			return (
				  			  <Trow key={ `tr_${index}` }>
				  			  	<Tcell>{ Object.keys(comparisonDataD)[index] }</Tcell>
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
	  	</TableWrapper>
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