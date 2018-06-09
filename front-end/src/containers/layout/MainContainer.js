import { MainComponent } from 'components/layout';
import { connect }       from 'react-redux';
import { withRouter }    from 'react-router-dom';

export default withRouter(connect(
    null,
    null
)(MainComponent));
