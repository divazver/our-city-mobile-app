import * as React from 'react';
import renderer from 'react-test-renderer';
import ModuleButton from "@/components/moduleButton/ModuleButton";

describe('<ModuleButton />', () => {

    // Snapshot test
    it('renders correctly', () => {
        const tree = renderer
            .create(<ModuleButton name={"Aktuality"} icon={"home"} link={"/"} />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    // Unit test
    it('shorten module name', () => {
        const tree = renderer.create(<ModuleButton name={"Very long name of module!"} icon={"home"} link={"/"} />);

        expect(tree.root.findByProps({h6: true}).props.children.length).toBe(20);
    });
});

