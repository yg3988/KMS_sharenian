import React from 'react';

import './sharenian.css';

import refresh from '../img/sync-alt-solid.svg';
import config from '../img/cog-solid.svg';

const Sharenian = ({ guildInfo }) => {
	const guild = guildInfo.guild;
	const arrUser = guildInfo.users;

	const handelToggleWrap = (e) => {
		//console.log(e.currentTarget.children[1])
		// const wrap = document.getElementsByClassName("lane1");
		// console.log(wrap)
    if (e.currentTarget.children[1].style.display === "none")
			e.currentTarget.children[1].style.display = "flex"
    else
			e.currentTarget.children[1].style.display = "none"
	}

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
				<h1>{guild}</h1>
				<div className='horizon_divider' />
				<div className="sharenian_tables">
					<div className="sharenian_lane_wrapper lane1" onClick={handelToggleWrap}>
						<div className="table_header">
							1수로
						</div>
						<div className="sharenian_table_wrapper">
							<table>
								<tbody>
									<tr>
										<th colSpan="3">1 파티</th>
									</tr>
									<tr>
										<td>닉넴</td>
										<td>직업</td>
										<td>레벨/무릉</td>
									</tr>
								</tbody>
							</table>
							<table>
								<tbody>
									<tr>
										<th colSpan="3">2 파티</th>
									</tr>
									<tr>
										<td>닉넴</td>
										<td>직업</td>
										<td>레벨/무릉</td>
									</tr>
								</tbody>
							</table>
							<table>
								<tbody>
									<tr>
										<th colSpan="3">3 파티</th>
									</tr>
									<tr>
										<td>닉넴</td>
										<td>직업</td>
										<td>레벨/무릉</td>
									</tr>
								</tbody>
							</table>
						</div>
						</div>
					<div className="sharenian_lane_wrapper lane2" onClick={handelToggleWrap}>
						<div className="table_header">
							2수로
						</div>
						<div className="sharenian_table_wrapper">
							<table>
								<tbody>
									<tr>
										<th colSpan="3">1 파티</th>
									</tr>
									<tr>
										<td>닉넴</td>
										<td>직업</td>
										<td>레벨/무릉</td>
									</tr>
								</tbody>
							</table>
							<table>
								<tbody>
									<tr>
										<th colSpan="3">2 파티</th>
									</tr>
									<tr>
										<td>닉넴</td>
										<td>직업</td>
										<td>레벨/무릉</td>
									</tr>
								</tbody>
							</table>
							<table>
								<tbody>
									<tr>
										<th colSpan="3">3 파티</th>
									</tr>
									<tr>
										<td>닉넴</td>
										<td>직업</td>
										<td>레벨/무릉</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<div className="sharenian_lane_wrapper lane3" onClick={handelToggleWrap}>
						<div className="table_header">
							3수로
						</div>
						<div className="sharenian_table_wrapper">
							<table>
								<tbody>
									<tr>
										<th colSpan="3">1 파티</th>
									</tr>
									<tr>
										<td>닉넴</td>
										<td>직업</td>
										<td>레벨/무릉</td>
									</tr>
								</tbody>
							</table>
							<table>
								<tbody>
									<tr>
										<th colSpan="3">2 파티</th>
									</tr>
									<tr>
										<td>닉넴</td>
										<td>직업</td>
										<td>레벨/무릉</td>
									</tr>
								</tbody>
							</table>
							<table>
								<tbody>
									<tr>
										<th colSpan="3">3 파티</th>
									</tr>
									<tr>
										<td>닉넴</td>
										<td>직업</td>
										<td>레벨/무릉</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<div className='guild_users_container'>
				<div className='users_title'>
					<h3>Guild Members</h3>
					<img src={refresh} className='member-sync' alt='동기화' />
				</div>
				<ul className='members'>
					{!arrUser
						? null
						: arrUser.map((value, idx) => (
								<li key={idx} className='guild_user'>
									<div className='left'>
										<p>{value.nick}</p>
										<p>{value.job}</p>
									</div>
									<div className="right">
										<p>{value.lv}/</p>
										<p>{value.moorueng}</p>	
									</div>
								</li>
						  ))}
				</ul>
			</div>
		</div>
	);
};

export default Sharenian;
