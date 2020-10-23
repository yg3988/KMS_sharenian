import React from 'react';

import './sharenian-lane.css';

const SharenianLane = ({ laneSharenian }) => {
	const showMembers = (members) => {
		let arrMembers = new Array();
		for (let i = 0; i < members.length; i++) {
			arrMembers.push(
				<tr key={`members${i + 1}`}>
					<td>{members[i].nick}</td>
					<td>{members[i].job}</td>
					<td>{`${members[i].lv}/${members[i].moorueng}`}</td>
				</tr>
			);
		}
		return arrMembers;
	};

	const showPartys = (partys) => {
		let arrParty = new Array();

		for (let i = 0; i < partys.length; i++) {
			arrParty.push(
				<table key={`partys${i + 1}`}>
					<tbody>
						<tr>
							<th colSpan='3'>{`${i + 1} 파티`}</th>
						</tr>
						<tr>
							<td>닉네임</td>
							<td>직업</td>
							<td>레벨/무릉</td>
						</tr>
						{showMembers(partys[i])}
					</tbody>
				</table>
			);
		}

		return arrParty;
	};

	const arrLane = (lanes) => {
		console.log(lanes);
		let arrDiv = new Array();

		for (let i = 0; i < lanes.length; i++) {
			arrDiv.push(
				<div className='sharenian_lane_wrapper' key={`lanes${i + 1}`}>
					<div className='table_header'>{`${i + 1} 수로`}</div>
					<div className='sharenian_table_wrapper'>{showPartys(lanes[i])}</div>
				</div>
			);
		}

		return arrDiv;
	};

	return <div className='sharenian_tables'>{arrLane(laneSharenian)}</div>;
};

export default SharenianLane;
