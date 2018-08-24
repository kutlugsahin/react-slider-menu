import * as React from 'react';
import { SlideMenu, SlideMenuItem } from '../slide-menu';
import './styles.scss';

export interface AppProps {

}

class App extends React.Component<AppProps> {
	constructor(props: AppProps) {
		super(props);
	}

	render() {
		return (
			<div className="app">
				<SlideMenu>
					<SlideMenuItem label="slide item 1">1111111</SlideMenuItem>
					<SlideMenuItem label="slide item 2">222222</SlideMenuItem>
					<SlideMenuItem label="slide item 3">333333</SlideMenuItem>
				</SlideMenu>
			</div>
		)
	}
}

export default App;
