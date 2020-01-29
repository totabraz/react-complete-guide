import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() })

describe('<NavigationItems />', () => {

	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavigationItems />)
	})

	it('should render two <NavigationItem /> elementes if not authenticated', () => {
		// shallow works loading superficially the component
		expect(wrapper.find(NavigationItem))
			.toHaveLength(2)
	})

	it('should render three <NavigationItem /> elementes if is authenticated', () => {
		// shallow works loading superficially the component
		wrapper.setProps({ isAuthenticated: true })
		expect(wrapper.find(NavigationItem))
			.toHaveLength(3)
	})

	it('should an exact logouth button', () => {
		// shallow works loading superficially the component
		wrapper.setProps({ isAuthenticated: true })
		expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>))
			.toEqual(true)
	})
})
