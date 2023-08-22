import { styled } from 'styled-components';

import { colors } from '../utils/constants';

const Section = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
`;

const Table = styled.table`
	border: 0;
	border-collapse: collapse;
	padding: 1rem;
	background-color: #FAFAFA;
	font-size: 0.875rem;
	box-shadow: 0 10px 20px rgba(0,0,0,0.1);
`;

const Trow = styled.tr`
	border-bottom: 1px solid ${colors.lightestGray};
`;

const Theader = styled.th`
	padding: 1.5rem 3rem;
	text-align: left;
	text-transform: uppercase;
	border-bottom: 2px solid ${colors.gray};
	color: ${colors.darkGray};

	&:not(:nth-child(1)) {
		background-color: ${colors.white};
		color: ${colors.primary};
		border-color: ${colors.primary};
	}
`;

const Tcell = styled.td`
	padding: 1.5rem 3rem;
	color: ${props => props.$active ? colors[props.$active] : 'inherit'};

	&:not(:nth-child(1)) {
		background-color: ${colors.white};
	}
`;

const Loader = styled.span`
	@media (prefers-reduced-motion: no-preference) {
    animation: Spin infinite 2s linear;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 2px solid ${colors.primary};
    border-bottom-color: transparent;
    display: inline-block;
	}

	@keyframes Spin {
	  from {
	    transform: rotate(0deg);
	  }
	  to {
	    transform: rotate(360deg);
	  }
	}
`;

const Legends = styled.ul`
	display: flex;
	justify-content: space-between;
	margin-top: 3rem;
	gap: 5rem;
`;

const LegendsItem = styled.li`
	position: relative;
	font-size: 0.875rem;
	color: ${colors.darkerGray};

	&:nth-child(n) {
		&:before {
			content: '';
			position: absolute;
			left: -1.5rem;
			top: 0.025rem;
			width: 1rem;
			height: 1rem;
		}
	}

	&:nth-child(1) {
		color: ${colors.primary};

		&:before {
			background-color: ${colors.primary};
		}
	}

	&:nth-child(2) {
		color: ${colors.yellow};

		&:before {
			background-color: ${colors.yellow};
		}
	}

	&:nth-child(3) {
		color: ${colors.orange};

		&:before {
			background-color: ${colors.orange};
		}
	}

	&:nth-child(4) {
		color: ${colors.red};

		&:before {
			background-color: ${colors.red};
		}
	}
`;


export {
	Section,
	Table, 
	Trow, 
	Theader, 
	Tcell,
	Loader,
	Legends,
	LegendsItem
};