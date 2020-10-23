//import node_modules
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//import axios servies
import api from '../services/index';

//import component
import Sharenian from '../components/sharenian';

const SharenianContainer = () => {
	const useMember = (initialValue) => {
		const [member, setMember] = useState(initialValue);

		const pushMember = (e) => {
			const idx = parseInt(e);
			setMember((prevState) => ({
				...prevState,
				[idx]: guildInfo.users[parseInt(e)],
			}));
		};

		const deleteMember = (e) => {
			const idx = parseInt(e);
			delete member[idx];
		};

		return { member, pushMember, deleteMember };
	};

	const gid = useLocation().pathname.split('/')[2];
	const willEnteranceMembers = useMember({});
	const [guildInfo, setGuildInfo] = useState([]);
	const [isMount, setIsMount] = useState(false);
	const [lane, setLane] = useState([]);

	const getGuildInfo = (gid) => {
		api.getGuildById({ gid: gid }).then((res) => {
			const data = res.data.data;
			setGuildInfo(data);
		});
	};

	const handleOnClickAssignParty = (e) => {
		let temp = new Array(guildInfo.users.length);
		let arr = new Array();

		for (const [idx, value] of Object.entries(willEnteranceMembers.member)) {
			temp[idx] = value;
		}

		for (let i = 0; i < temp.length; i++) {
			if (!temp[i]) continue;
			arr.push(temp[i]);
		}

		api.getMembersOfSharenian(arr).then((res) => setLane(res.data));
	};

	useEffect(() => {
		if (!isMount) {
			setIsMount(true);
			getGuildInfo(gid);
		}
	}, [isMount, gid, lane]);

	return (
		<div>
			<Sharenian
				guildInfo={guildInfo}
				addMember={willEnteranceMembers}
				sendMembers={handleOnClickAssignParty}
				laneSharenian={lane}
			/>
		</div>
	);
};

export default SharenianContainer;
