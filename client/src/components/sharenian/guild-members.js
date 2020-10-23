import React from 'react';

import './guild-members.css';

const GuildMembers = ({ arrUser, stateMember }) => {
	const handleSwitchOnRadio = (e, id) => {
		if (
			document.getElementById(`listitem${e.target.parentNode.parentNode.id}`)
		) {
			if (document.getElementById(id).checked) {
				document.getElementById(id).checked = false;
				document.getElementById(
					`listitem${e.target.parentNode.parentNode.id}`
				).style.backgroundColor = '#fff';
				stateMember.deleteMember(e.target.parentNode.parentNode.id);
			} else {
				document.getElementById(id).checked = true;
				document.getElementById(
					`listitem${e.target.parentNode.parentNode.id}`
				).style.backgroundColor = '#c5c5c5';
				stateMember.pushMember(e.target.parentNode.parentNode.id);
			}
		}
	};

	const members = () => {
		let arr = [];

		for (let i = arrUser.length - 1; i > -1; i--) {
			const temp = arrUser[i];
			arr.push(
				<li className='guild_user' key={i} id={`listitem${i}`}>
					<input type='radio' id={temp.nick} />
					<div
						className='members_contents'
						id={i}
						onClick={(e) => handleSwitchOnRadio(e, temp.nick)}
					>
						<div className='left'>
							<p>{temp.nick}</p>
							<p>{temp.job}</p>
						</div>
						<div className='right'>
							<p>{temp.lv}</p>
							<p>{temp.moorueng}</p>
						</div>
					</div>
				</li>
			);
		}

		return arr;
	};
	//
	return <ul className='members'>{members()}</ul>;
};

export default GuildMembers;
