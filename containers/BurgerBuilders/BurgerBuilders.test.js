import React from 'react';

import {shallow , configure} from 'enzyme' ;
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilders';
import Buildcontrols from '../../components/Burger/BuildControls/BuildControls'

configure({adapter: new Adapter()});

describe('<BurgerBuilder',() => {
    let wrapper;
    beforeEach(() => {
        wrapper= wrapper=shallow(<BurgerBuilder setInitialState={()=>{}}/>);
    })
    it('should render BuildControls if ings are passed',() => {
        wrapper.setProps({ings: {salad:1}})
        expect(wrapper.find(Buildcontrols)).toHaveLength(1);
    });
})
