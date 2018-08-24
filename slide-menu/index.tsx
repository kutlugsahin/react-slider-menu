import * as React from 'react';
import './styles.scss';

const { Provider, Consumer } = React.createContext({});

enum Transition {
	instant = '',
	left = 'left',
	right = 'right'
}

interface SlideContext {
	onClick: (item: SlideMenuItem) => void;
}

export interface SlideMenuItemProps {
	label: string;
}

class SlideMenuItem extends React.Component<SlideMenuItemProps> {
	constructor(props: SlideMenuItemProps) {
		super(props);
	}

	render() {
		return (
			<Consumer>
				{(context: SlideContext) => {
					return (
						<div onClick={() => context.onClick(this)} className="slide-menu-item">
							{this.props.label}
						</div>
					);
				}}
			</Consumer>
		)
	}
}

export interface SlideMenuProps {
	onItemSelected?: (item: SlideMenuItem) => void;
	selectedItem?: SlideMenuItem;
}

interface SlideMenuState {
	transition?: Transition;
	currentItem: SlideMenuItem | SlideMenu;
	nextItem?: SlideMenuItem | SlideMenu;
	animate?: boolean;
}

class SlideMenu extends React.Component<SlideMenuProps, SlideMenuState> {
	private slideContext: SlideContext;
	constructor(props: SlideMenuProps) {
		super(props);
		this.onItemSelected = this.onItemSelected.bind(this);
		this.slideContext = { onClick: this.onItemSelected }
		this.state = {
			transition: Transition.instant,
			currentItem: this,
		}
	}

	componentDidMount() {

	}


	render() {
		const { transition, currentItem, nextItem, animate } = this.state;

		const currentClasses = [];

		if (transition !== undefined && !animate) {
			if (transition !== Transition.instant) {
				currentClasses.push('center');
			}
		}

		if (animate) {
			currentClasses.push('animate', transition);
		}

		const nextClasses = [];

		if (transition !== undefined && !animate) {
			if (transition !== Transition.instant) {
				nextClasses.push(transition === Transition.left ? 'right' : 'left');
			}
		}

		if (nextItem) {
			nextClasses.push('animate')
		}

		if (animate) {
			nextClasses.push('center');
		}

		return (
			<Provider value={this.slideContext}>
				<div className="slide-menu">
					<div key='side-panel-current' className={`panel ${currentClasses.join(' ')}`}>{currentItem.props.children}</div>
					{transition ? (
						<div key='side-panel-next' className={`panel ${nextClasses.join(' ')}`}>{nextItem ? nextItem.props.children : null}</div>
					) : null}
				</div>
			</Provider>
		)
	}

	onItemSelected(item: SlideMenuItem) {
		this.setState({ transition: Transition.left },
			() => this.setState({ nextItem: item },
				() => setTimeout(() => {
					this.setState({ animate: true },
						() => {
							setTimeout(() => {
								this.setState({
									transition: undefined,
									nextItem: undefined,
									currentItem: this.state.nextItem,
									animate: undefined,
								})
							}, this.state.transition === Transition.instant ? 0 : 300);
						})
				},0)));
	}
}

export { SlideMenu, SlideMenuItem }
