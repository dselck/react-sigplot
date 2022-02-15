import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Layer from './layer';

export default class WPipeLayer extends Layer {
  static propTypes = {
    /**
     * URI to WPIPE websocket server
     *
     * This usually looks like ws://<some URI>:<some port>
     *
     * Keep in mind that if the websocket server is on a different domain,
     * most browsers/web-servers will block cross origin requests.
     *
     * Since this layer doesn't take any numeric data,
     * we are omitting the use of the `data` prop here.
     */
    wsurl: PropTypes.string,

    /** Key-value pairs whose values alter plot settings */
    overrides: PropTypes.object,

    /** Layer options */
    options: PropTypes.object,

    /** Frames per second throttles the data flow to the client by the specified */
    fps: PropTypes.number,
  };

  /**
   * Handles WPipeLayer being mounted onto the DOM
   *
   * All we need to do when the component 'mounts',
   * is call `plot.overlay_wpipe` with the relevant
   * websocket url and options. This will return our layer object.
   *
   * A large portion of the time, especially for dynamic
   * systems, this will look like a single
   * `this.context.overlay_wpipe(wsurl, null, {"layerType": "1D", pipesize: ...)`
   * upon mount.
   */
  componentDidMount() {
    const { wsurl, options, layerOptions, fps } = this.props;
    this.layer = this.context.overlay_wpipe(wsurl, options, layerOptions, fps);
  }

  /**
   * Handles new properties being passed into <WPipeLayer/>
   *
   * UNSAFE_componentWillReceiveProps() replaced with
   * shouldComponentUpdate() as they have similar calling patterns.
   * We are using this method for a side-effect, and therefore
   * returning True. getDerivedStateFromProps() had an additional
   * call at mount which UNSAFE_componentWillReceiveProps() lacked.
   * Thus the usage of shouldComponentUpdate().
   *
   * This sits in the lifecycle right before `componentWillUpdate`,
   * and most importantly `render`, so this is where we will call
   * the plot's `reload` and `headermod` methods.
   *
   * @param nextProps    the newly received properties
   */
  shouldComponentUpdate(nextProps, _nextState) {
    const {
      wsurl: currentWsurl,
      options: currentOptions,
      layerOptions: currentLayerOptions,
      fps: currentFps,
    } = this.props;
    const {
      wsurl: nextWsurl,
      options: nextOptions,
      layerOptions: nextLayerOptions,
      fps: nextFps,
    } = nextProps;

    // if the wsurl changes, we'll go ahead
    // and delete the layer and create a new one
    // otherwise, we only need to headermod
    // with the new options
    if (nextWsurl !== currentWsurl || currentFps !== nextFps) {
      this.context.delete_layer(this.layer);
      this.layer = this.context.overlay_wpipe(
        nextWsurl,
        nextOptions,
        nextLayerOptions,
        nextFps
      );
    } else if (nextOptions !== currentOptions) {
      this.context.headermod(this.layer, nextOptions);
    } else if (nextLayerOptions !== currentLayerOptions) {
      this.context.get_layer(this.layer).change_settings(nextLayerOptions);
    }
    return true;
  }
}
