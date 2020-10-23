import React from 'react';

import './sharenian.css';

import refresh from '../img/sync-alt-solid.svg';
import config from '../img/cog-solid.svg';
import Lane from './sharenian/sharenian-lane';
import GuildMembers from './sharenian/guild-members';

const Sharenian = ({ guildInfo, addMember, sendMembers, laneSharenian }) => {
	const guild = guildInfo.guild;
	const arrUser = guildInfo.users;

	return (
		<div className='guild_wrap'>
			<div className='guild_side_wrap'>
				<ul className='nav_bar_list'>
					<li>
						<img src={config} className='img guild-config' alt='길드관리' />
					</li>
				</ul>
			</div>
			<div className='contents_wrap'>
				<div className='header_wrap'>
					<h1>{guild}</h1>
					<div className='btns'>
						<div className='btn_assign_lane' onClick={(e) => sendMembers(e)}>
							<p>파티배정</p>
						</div>
					</div>
				</div>
				<div className='horizon_divider' />
				{!laneSharenian.length ? (
					<div className='none_display'>
						<p>
							우측 길드원 선택 후<br /> 상단 파티배정 버튼을 눌러주세요
						</p>
					</div>
				) : (
					<Lane laneSharenian={laneSharenian} />
				)}
			</div>
			<div className='guild_users_container'>
				<div className='users_title'>
					<h3>Guild Members</h3>
					<img src={refresh} className='member-sync' alt='동기화' />
				</div>
				{!arrUser ? null : (
					<GuildMembers arrUser={arrUser} stateMember={addMember} />
				)}
			</div>
		</div>
	);
};

export default Sharenian;
