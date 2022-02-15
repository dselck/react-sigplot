import React from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import Layer from './layer';

/**
 * Wrapper around sigplot.Plot.overlay_href
 *
 * Typical use of this layer looks like
 *   <SigPlot>
 *     <HrefLayer href={'/path/to/file.tmp'}/>
 *   </SigPlot>
 */
class HrefLayer extends Layer {
  static propTypes = {
    /**
     * URI to BLUEFILE or MATFILE to plot
     *
     * This can either be local 'file:///path/to/file' or
     * remote 'http://myfile.com/file.tmp'
     *
     * Keep in mind that if the file is on a different domain,
     * most browsers/web-servers will block cross origin requests.
     *
     * Since this layer doesn't take any numeric data,
     * we are omitting the use of the `data` prop here.
     */
    href: PropTypes.string,

    /** Callback that executes once the file loads */
    onload: PropTypes.func,

    /** Layer options */
    options: PropTypes.object,
  };

  static defaultProps = {
    href: '',
    onload: null,
  };

  /**
   * On mount, all we need to do is call overlay_href
   */
  componentDidMount() {
    const { href, onload, options } = this.props;
    this.layer = this.plot.overlay_href(href, onload, options);
  }

  /**
   * Handles new properties being passed into <HrefLayer/>
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
    const { href: oldHref, options: oldOptions } = this.props;

    const { href: newHref, onload: newOnload, options: newOptions } = nextProps;

    // we only care if `href` or `options` changes
    if (newHref !== oldHref) {
      this.plot.deoverlay(this.layer);
      this.layer = this.plot.overlay_href(newHref, newOnload, newOptions);
    } else if (this.layer !== undefined && newOptions !== oldOptions) {
      this.plot.get_layer(this.layer).change_settings(newOptions);
    }

    return true;
  }
}

export default HrefLayer;
