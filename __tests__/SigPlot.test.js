import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { Plot } from 'sigplot';
import {
  SigPlot,
  ArrayLayer,
  PipeLayer,
  HrefLayer
} from '../src/index.js';

configure({ adapter: new Adapter() })

window.alert = (msg) => { console.log(msg) };

describe('<SigPlot />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(SigPlot.prototype, 'componentDidMount');
    const component = mount(<SigPlot />);
    expect(SigPlot.prototype.componentDidMount).to.have.property('callCount', 1);
  });

  it('renders with no child layer', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const component = mount(<SigPlot />);
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.undefined;
    expect(component.find('div').prop('style').width).to.equal(300);
    expect(component.find('div').prop('style').height).to.equal(300);
    expect(component.find('div').prop('style').display).to.equal('inline-block');
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(true);
    expect(component.instance().plot._Gx.expand).to.equal(true);
    expect(component.instance().plot._Gx.autol).to.equal(100);
    expect(component.instance().plot._Gx.autohide_panbars).to.equal(true);
    expect(component.instance().plot._Gx.lyr).to.be.an('array').that.is.empty;
  });

  it('renders with no child layer with custom height and width', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const component = mount(<SigPlot height={500} width={800} />);
    expect(component.props().width).to.equal(800);
    expect(component.props().height).to.equal(500);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.undefined;
    expect(component.find('div').prop('style').width).to.equal(800);
    expect(component.find('div').prop('style').height).to.equal(500);
    expect(component.find('div').prop('style').display).to.equal('inline-block');
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(true);
    expect(component.instance().plot._Gx.expand).to.equal(true);
    expect(component.instance().plot._Gx.autol).to.equal(100);
    expect(component.instance().plot._Gx.autohide_panbars).to.equal(true);
    expect(component.instance().plot._Gx.lyr).to.be.an('array').that.is.empty;
  });

  it('renders with no child layer with custom options and custom height and width', () => {
    const options = {
      all: false,
      expand: false,
      autol: 1,
      autohide_panbars: false,
    };
    const component = mount(<SigPlot height={500} width={800} options={options} />);
    expect(component.props().width).to.equal(800);
    expect(component.props().height).to.equal(500);
    expect(component.props().options.all).to.equal(false);
    expect(component.props().options.expand).to.equal(false);
    expect(component.props().options.autol).to.equal(1);
    expect(component.props().options.autohide_panbars).to.equal(false);
    expect(component.props().children).to.be.undefined;
    expect(component.find('div').prop('style').width).to.equal(800);
    expect(component.find('div').prop('style').height).to.equal(500);
    expect(component.find('div').prop('style').display).to.equal('inline-block');
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(1);
    expect(component.instance().plot._Gx.autohide_panbars).to.equal(false);
    expect(component.instance().plot._Gx.lyr).to.be.an('array').that.is.empty;
  });

  it('renders with 1D ArrayLayer with no data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const oneDimensionalData = [];
    const component = mount(
      <SigPlot options={options}>
        <ArrayLayer data={oneDimensionalData} />
      </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.not.be.undefined;
    expect(component.props().children).to.be.an('object');
    expect(component.props().children.props.data).to.equal(oneDimensionalData);
    expect(component.find('div').prop('style').width).to.equal(300);
    expect(component.find('div').prop('style').height).to.equal(300);
    expect(component.find('div').prop('style').display).to.equal('inline-block');
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(true);
    expect(component.instance().plot._Gx.expand).to.equal(true);
    expect(component.instance().plot._Gx.autol).to.equal(100);
    expect(component.instance().plot._Gx.autohide_panbars).to.equal(true);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.be.null;
  });

  it('renders with 2 1D ArrayLayers with no data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const oneDimensionalData1 = [];
    const oneDimensionalData2 = [];
    const component = mount(
      <SigPlot options={options}>
        <ArrayLayer data={oneDimensionalData1} />
        <ArrayLayer data={oneDimensionalData2} />
      </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.an('array');
    expect(component.props().children).to.have.lengthOf(2);
    expect(component.props().children[0].props.data).to.equal(oneDimensionalData1);
    expect(component.props().children[1].props.data).to.equal(oneDimensionalData2);
    expect(component.find('div').prop('style').width).to.equal(300);
    expect(component.find('div').prop('style').height).to.equal(300);
    expect(component.find('div').prop('style').display).to.equal('inline-block');
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(true);
    expect(component.instance().plot._Gx.expand).to.equal(true);
    expect(component.instance().plot._Gx.autol).to.equal(100);
    expect(component.instance().plot._Gx.autohide_panbars).to.equal(true);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(2);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.be.null;
    expect(component.instance().plot._Gx.lyr[1].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[1].ypoint).to.be.null;
  });

  it('renders with 1D ArrayLayer with data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(i * 10);
    }
    const oneDimensionalData = random;
    const component = mount(
      <SigPlot options={options}>
        <ArrayLayer data={oneDimensionalData} />
      </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.an('object');
    expect(component.props().children.props.data).to.equal(oneDimensionalData);
    expect(component.find('div').prop('style').width).to.equal(300);
    expect(component.find('div').prop('style').height).to.equal(300);
    expect(component.find('div').prop('style').display).to.equal('inline-block');
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(true);
    expect(component.instance().plot._Gx.expand).to.equal(true);
    expect(component.instance().plot._Gx.autol).to.equal(100);
    expect(component.instance().plot._Gx.autohide_panbars).to.equal(true);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.have.lengthOf(oneDimensionalData.length);
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.eql(new Float64Array(oneDimensionalData));
  });

  it('renders with 1D ArrayLayer with data then re-renders', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    let random1 = [];
    for (let i = 0; i <= 1000; i += 1) {
        random1.push(i * 10);
    }
    let random2 = [];
    for (let i = 0; i <= 1000; i += 1) {
        random2.push(i * 10);
    }
    const oneDimensionalData1 = random1;
    const oneDimensionalData2 = random2;

    let childInstance = {};
    const component = mount(
      <SigPlot options={options}>
        <ArrayLayer data={oneDimensionalData1} />
      </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.an('object');
    expect(component.props().children.props.data).to.equal(oneDimensionalData1);
    expect(component.find('div').prop('style').width).to.equal(300);
    expect(component.find('div').prop('style').height).to.equal(300);
    expect(component.find('div').prop('style').display).to.equal('inline-block');
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(true);
    expect(component.instance().plot._Gx.expand).to.equal(true);
    expect(component.instance().plot._Gx.autol).to.equal(100);
    expect(component.instance().plot._Gx.autohide_panbars).to.equal(true);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.have.lengthOf(oneDimensionalData1.length);
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.eql(new Float64Array(oneDimensionalData1));
  });

  it('renders with 2 1D ArrayLayers with data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };

    let random1 = [];
    for (let i = 0; i <= 1000; i += 1) {
        random1.push(10 * i);
    }

    let random2 = [];
    for (let i = 0; i <= 1000; i += 1) {
        random2.push(10 * i);
    }

    const oneDimensionalData1 = random1;
    const oneDimensionalData2 = random2;
    const component = mount(
      <SigPlot options={options}>
        <ArrayLayer data={oneDimensionalData1} />
        <ArrayLayer data={oneDimensionalData2} />
      </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.an('array');
    expect(component.props().children).to.have.lengthOf(2);
    expect(component.props().children[0].props.data).to.equal(oneDimensionalData1);
    expect(component.props().children[1].props.data).to.equal(oneDimensionalData2);
    expect(component.find('div').prop('style').width).to.equal(300);
    expect(component.find('div').prop('style').height).to.equal(300);
    expect(component.find('div').prop('style').display).to.equal('inline-block');
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(true);
    expect(component.instance().plot._Gx.expand).to.equal(true);
    expect(component.instance().plot._Gx.autol).to.equal(100);
    expect(component.instance().plot._Gx.autohide_panbars).to.equal(true);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(2);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.have.lengthOf(oneDimensionalData1.length);
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.eql(new Float64Array(oneDimensionalData1));
    expect(component.instance().plot._Gx.lyr[1].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[1].ypoint).to.have.lengthOf(oneDimensionalData2.length);
    expect(component.instance().plot._Gx.lyr[1].ypoint).to.eql(new Float64Array(oneDimensionalData2));
  });

  it('renders with 2D ArrayLayer with no data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const layerOptions = {type: 2000, subsize: 1000};
    let random = [];
    const twoDimensionalData = random;
    const component = mount(
        <SigPlot options={options}>
          <ArrayLayer
            data={twoDimensionalData}
            options={layerOptions}
          />
        </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.an('object');
    expect(component.props().children.props.data).to.equal(twoDimensionalData);
    expect(component.find('div').prop('style').width).to.equal(300);
    expect(component.find('div').prop('style').height).to.equal(300);
    expect(component.find('div').prop('style').display).to.equal('inline-block');
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(true);
    expect(component.instance().plot._Gx.expand).to.equal(true);
    expect(component.instance().plot._Gx.autol).to.equal(100);
    expect(component.instance().plot._Gx.autohide_panbars).to.equal(true);
    expect(component.instance().plot._Gx.lyr[0].hcb.subsize).to.equal(1000);
    expect(component.instance().plot._Gx.lyr[0].hcb.type).to.equal(2000);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].buf).to.be.empty;
  });

  it('renders with 2D ArrayLayer with data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const layerOptions = {type: 2000, subsize: 1000};
    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(10 * i);
    }
    const twoDimensionalData = random;
    const component = mount(
        <SigPlot options={options}>
          <ArrayLayer
            data={twoDimensionalData}
            options={layerOptions}
          />
        </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.an('object');
    expect(component.props().children.props.data).to.equal(twoDimensionalData);
    expect(component.find('div').prop('style').width).to.equal(300);
    expect(component.find('div').prop('style').height).to.equal(300);
    expect(component.find('div').prop('style').display).to.equal('inline-block');
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(true);
    expect(component.instance().plot._Gx.expand).to.equal(true);
    expect(component.instance().plot._Gx.autol).to.equal(100);
    expect(component.instance().plot._Gx.autohide_panbars).to.equal(true);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].hcb.subsize).to.equal(1000);
    expect(component.instance().plot._Gx.lyr[0].hcb.type).to.equal(2000);
  });

  it('throws with 1D PipeLayer with no data and no size defined', () => {
    expect(() => {
      const options = {
        all: true,
        expand: true,
        autol: 100,
        autohide_panbars: true,
      };
      let random = [];
      const oneDimensionalData = random;
      const component = mount(
        <SigPlot options={options}>
          <PipeLayer data={oneDimensionalData} />
        </SigPlot>
      );
    }).to.throw(/1D layer could not determine appropriate size for pipe, use framesize option/);
  });

  it('renders with 2D PipeLayer with no data', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    let random = [];
    const twoDimensionalData = random;
    const component = mount(
        <SigPlot options={options}>
          <PipeLayer data={twoDimensionalData} options={{type: 2000, subsize: 1000}} />
        </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.an('object');
    expect(component.props().children.props.data).to.equal(twoDimensionalData);
    expect(component.instance().plot._Gx.all).to.equal(true);
    expect(component.instance().plot._Gx.expand).to.equal(true);
    expect(component.instance().plot._Gx.autol).to.equal(100);
    expect(component.instance().plot._Gx.autohide_panbars).to.equal(true);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].hcb.subsize).to.equal(1000);
    expect(component.instance().plot._Gx.lyr[0].hcb.type).to.equal(2000);
    expect(component.instance().plot._Gx.lyr[0].zbuf).to.eql(new Float64Array(1000));
  });

  it('renders with 2D PipeLayer with data passed in but not displayed', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(10 * i);
    }
    const twoDimensionalData = random;
    const component = mount(
        <SigPlot options={options}>
          <PipeLayer data={twoDimensionalData} options={{type: 2000, subsize: 1000}} />
        </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.an('object');
    expect(component.props().children.props.data).to.equal(twoDimensionalData);
    expect(component.instance().plot._Gx.all).to.equal(true);
    expect(component.instance().plot._Gx.expand).to.equal(true);
    expect(component.instance().plot._Gx.autol).to.equal(100);
    expect(component.instance().plot._Gx.autohide_panbars).to.equal(true);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].hcb.subsize).to.equal(1000);
    expect(component.instance().plot._Gx.lyr[0].hcb.type).to.equal(2000);
    expect(component.instance().plot._Gx.lyr[0].zbuf).to.eql(new Float64Array(1000));
  });

  it('renders with HrefLayer with no file', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const file = "";
    const component = mount(
      <SigPlot options={options}>
        <HrefLayer />
      </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.an('object');
    expect(component.props().children.props.href).to.equal(file);
  });

  it('renders with HrefLayer with valid href', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const file = "dat/penny.prm";
    const component = mount(
      <SigPlot options={options}>
        <HrefLayer href={file} />
      </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.an('object');
    expect(component.props().children.props.href).to.equal(file);
  });

  it('renders with HrefLayer with invalid href', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const file = "dat/invalid.prm";
    const component = mount(
      <SigPlot options={options}>
        <HrefLayer href={file} />
      </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.an('object');
    expect(component.props().children.props.href).to.equal(file);
  });

  it('renders with HrefLayer with 2 valid hrefs', () => {
    const options = {
      all: true,
      expand: true,
      autol: 100,
      autohide_panbars: true,
    };
    const file1 = "dat/penny.prm";
    const file2 = "dat/sin.tmp";
    const component = mount(
      <SigPlot options={options}>
        <HrefLayer href={file1} />
        <HrefLayer href={file2} />
      </SigPlot>
    );
    expect(component.props().width).to.equal(300);
    expect(component.props().height).to.equal(300);
    expect(component.props().options.all).to.equal(true);
    expect(component.props().options.expand).to.equal(true);
    expect(component.props().options.autol).to.equal(100);
    expect(component.props().options.autohide_panbars).to.equal(true);
    expect(component.props().children).to.be.an('array');
    expect(component.props().children).to.have.lengthOf(2);
    expect(component.props().children[0].props.href).to.equal(file1);
    expect(component.props().children[1].props.href).to.equal(file2);
  });
});

describe('<ArrayLayer />', () => {
  it('reloads plot on data prop change', () => {
    const options = {};
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, options) };

    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(i * 10);
    }
    const oneDimensionalData = random;

    const component = mount(
      <ArrayLayer data={oneDimensionalData} />,
      { context }
    ); 

    expect(component.props().data).to.equal(oneDimensionalData);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.have.lengthOf(oneDimensionalData.length);
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.eql(new Float64Array(oneDimensionalData));

    let random2 = [];
    for (let i = 0; i <= 1000; i += 1) {
        random2.push(i * 10);
    }
    const oneDimensionalData2 = random2;

    component.setProps({data: random2});
    expect(component.props().data).to.equal(oneDimensionalData2);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.have.lengthOf(oneDimensionalData2.length);
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.eql(new Float64Array(oneDimensionalData2));
  });
});

describe('<PipeLayer />', () => {
  it('pushes new data to plot on data prop change', () => {
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, {}) };

    const twoDimensionalData = [];

    const options = {framesize: 1000, type: 2000, subsize: 1000};
    const component = mount(
      <PipeLayer data={twoDimensionalData} options={options} />,
      { context }
    ); 

    expect(component.props().data).to.equal(twoDimensionalData);
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].hcb.subsize).to.equal(1000);
    expect(component.instance().plot._Gx.lyr[0].hcb.type).to.equal(2000);
    const tmp = new Float64Array(1000);
    for (let i = 0; i < 1000; i++) {
      expect(component.instance().plot._Gx.lyr[0].hcb.dview[i]).to.equal(tmp[i]);
    }

    let random = [];
    for (let i = 0; i <= 1000; i += 1) {
        random.push(i * 10);
    }
    component.setProps({data: random});
    expect(component.props().data).to.equal(random);
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].hcb.subsize).to.equal(1000);
    expect(component.instance().plot._Gx.lyr[0].hcb.type).to.equal(2000);
    const tmp2 = new Float64Array(random);
    for (let i = 0; i < 1000; i++) {
      expect(component.instance().plot._Gx.lyr[0].hcb.dview[i]).to.equal(tmp2[i]);
    }
  });
});

describe('<HrefLayer />', () => {
  it('reloads plot on href prop change', () => {
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, {}) };
    const hrefOne = "";
    const component = mount(
      <HrefLayer href={hrefOne} />,
      { context }
    ); 

    expect(component.props().href).to.equal(hrefOne);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].hcb.file_name).to.equal(hrefTwo);

    const hrefTwo = "dat/penny.prm";
    component.setProps({href: hrefTwo});
    expect(component.props().href).to.equal(hrefTwo);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].hcb.file_name).to.equal(hrefTwo);
  });

  it('changes settings on options prop change', () => {
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, {}) };
    const hrefOne = "dat/penny.prm";
    const component = mount(
      <HrefLayer href={hrefOne} />,
      { context }
    ); 

    expect(component.props().href).to.equal(hrefOne);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].hcb.file_name).to.equal(hrefOne);

    const options = {
      xmin: 0,
      xmax: 100,
    };
    component.setProps({options: options});
    expect(component.props().href).to.equal(hrefOne);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.not.empty;
    expect(component.instance().plot._Gx.lyr[0].options).to.equal(options);
    expect(component.instance().plot._Gx.lyr[0].hcb.file_name).to.equal(hrefOne);
  });
});

describe('<WebsocketLayer />', () => {
  it('reloads plot on wsurl prop change', () => {
    const options = {};
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, options) };

    const websocketURL = "";
    const component = mount(
      <WebsocketLayer wsurl={websocketURL} />,
      { context }
    ); 

    expect(component.props().data).to.equal(oneDimensionalData);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.have.lengthOf(oneDimensionalData.length);

    let random2 = [];
    for (let i = 0; i <= 1000; i += 1) {
        random2.push(i * 10);
    }
    const oneDimensionalData2 = random2;

    component.setProps({data: random2});
    expect(component.props().data).to.equal(oneDimensionalData2);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    expect(component.instance().plot._Gx.lyr[0].ypoint).to.have.lengthOf(oneDimensionalData2.length);
  });

  it('changes settings on options prop change', () => {
    const element = global.document.createElement("div");
    const context = { plot: new Plot(element, options) };

    const websocketURL = "";
    const component = mount(
      <WebsocketLayer wsurl={websocketURL} />,
      { context }
    ); 

    expect(component.props().data).to.equal(oneDimensionalData);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.empty;
    // expect(component.instance().plot._Gx.lyr[0].ypoint).to.have.lengthOf(oneDimensionalData.length);

    const options = {xmin: 0, xmax: 100};
    component.setProps({options});
    expect(component.props().data).to.equal(oneDimensionalData2);
    expect(component.instance().plot).to.not.be.undefined;
    expect(component.instance().plot._Gx.all).to.equal(false);
    expect(component.instance().plot._Gx.expand).to.equal(false);
    expect(component.instance().plot._Gx.autol).to.equal(-1);
    expect(component.instance().plot._Gx.lyr).to.have.lengthOf(1);
    expect(component.instance().plot._Gx.lyr[0].options).to.be.an('object').that.is.not.empty;
    expect(component.instance().plot._Gx.lyr[0].options).to.equal(options);
    // expect(component.instance().plot._Gx.lyr[0].ypoint).to.have.lengthOf(oneDimensionalData2.length);
  });
});