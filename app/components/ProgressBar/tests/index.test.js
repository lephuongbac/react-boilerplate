import ProgressBar from '../index';
import styles from '../styles.css';

import expect from 'expect';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('<ProgressBar />', () => {
  beforeEach(() => {
    this.clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    this.clock = sinon.restore();
  });

  it('should initially render hidden progress bar', () => {
    const renderedComponent = shallow(
      <ProgressBar />
    );
    expect(renderedComponent.find(`.${styles.reactProgressBarHide}`).length).toEqual(1);
  });

  it('should render render horizontal progress bar', () => {
    const renderedComponent = shallow(
      <ProgressBar />
    );
    expect(renderedComponent.find(`.${styles.reactProgressBarPercent}`).length).toEqual(1);
  });

  it('should set state.percent as props.percent', () => {
    const expected = 50;
    const renderedComponent = mount(
      <ProgressBar percent={expected} />
    );
    expect(renderedComponent.state().percent).toEqual(expected);
  });

  it('should call componentDidMount', () => {
    sinon.spy(ProgressBar.prototype, 'componentDidMount');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} />
    );
    expect(ProgressBar.prototype.componentDidMount.calledOnce).toEqual(1);
    ProgressBar.prototype.componentDidMount.restore();
  });

  it('should call componentWillReceiveProps', () => {
    sinon.spy(ProgressBar.prototype, 'componentWillReceiveProps');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} />
    );
    renderedComponent.setProps({ percent: 50 });
    expect(ProgressBar.prototype.componentWillReceiveProps.calledOnce).toEqual(1);
    ProgressBar.prototype.componentWillReceiveProps.restore();
  });

  it('should unset ProgressBar.interval after getting new props', () => {
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} />
    );
    const inst = renderedComponent.instance();

    this.clock.tick(1000);
    expect(inst.interval).toExist();
    inst.componentWillReceiveProps({ percent: 50 });
    expect(inst.interval).toNotExist();
  });

  it('should unset ProgressBar.timeout after getting new props', () => {
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={100} />
    );
    const inst = renderedComponent.instance();

    this.clock.tick(1000);
    expect(inst.timeout).toExist();
    inst.componentWillReceiveProps({ percent: 50 });
    expect(inst.timeout).toNotExist();
  });

  it('should set state to -1 after new route mounts', () => {
    const renderedComponent = mount(
      <ProgressBar percent={0} />
    );
    renderedComponent.setProps({ percent: 100 });
    this.clock.tick(401);
    expect(renderedComponent.state().percent).toEqual(-1);
  });

  it('should call componentWillUnmount', () => {
    sinon.spy(ProgressBar.prototype, 'componentWillUnmount');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} />
    );
    renderedComponent.unmount();
    expect(ProgressBar.prototype.componentWillUnmount.calledOnce).toEqual(1);
    ProgressBar.prototype.componentWillUnmount.restore();
  });

  it('should unset ProgressBar.interval after unmounting', () => {
    sinon.spy(ProgressBar.prototype, 'componentWillUnmount');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={0} />
    );
    const inst = renderedComponent.instance();

    this.clock.tick(1000);
    expect(inst.interval).toExist();
    renderedComponent.unmount();
    expect(inst.interval).toNotExist();
    ProgressBar.prototype.componentWillUnmount.restore();
  });

  it('should unset ProgressBar.timeout after unmounting', () => {
    sinon.spy(ProgressBar.prototype, 'componentWillUnmount');
    const renderedComponent = mount( // eslint-disable-line
      <ProgressBar percent={100} />
    );
    const inst = renderedComponent.instance();

    this.clock.tick(1000);
    expect(inst.timeout).toExist();
    renderedComponent.unmount();
    expect(inst.timeout).toNotExist();
    ProgressBar.prototype.componentWillUnmount.restore();
  });

  describe('increment progress', () => {
    beforeEach(() => {
      this.clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      this.clock = sinon.restore();
    });

    it('should start incrementing progress if 0 <= percent < 100', () => {
      const initialPercent = 50;
      const renderedComponent = mount(
        <ProgressBar percent={initialPercent} />
      );
      this.clock.tick(1000);
      expect(renderedComponent.state().percent).toBeGreaterThan(initialPercent);
    });

    it('should stop incrementing progress if percent >= 100', () => {
      const initialPercent = 100;
      const expected = -1;
      const renderedComponent = mount(
        <ProgressBar percent={initialPercent} />
      );
      this.clock.tick(1000);
      expect(renderedComponent.state().percent).toEqual(expected);
    });
  });
});
