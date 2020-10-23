//import node_modules
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";


//import axios servies
import api from "../services/index";

//import component
import Sharenian from "../components/sharenian";

const SharenianContainer = () => {
	const gid = useLocation().pathname.split("/")[2];
	const [guildInfo, setGuildInfo] = useState([]);
	const [isMount, setIsMount] = useState(false);

	const getGuildInfo = (gid) => {
		api
			.getGuildById({ gid: gid })
			.then((res) => {
				const data = res.data.data;
				setGuildInfo(data);
			});
	}

	useEffect(() => {
		if (!isMount){
			setIsMount(true);
			getGuildInfo(gid);
		}
	});


	return (
		<div>
			<Sharenian guildInfo={guildInfo} />	
		</div>
	);
};

export default SharenianContainer;
