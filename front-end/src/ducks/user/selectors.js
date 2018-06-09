export default {
    isFetching: ( state ) => ({ isFetching: state.getIn([ 'user', 'status', 'isFetching' ]) }),
    user: ( state, index ) => ({ user: state.getIn([ 'user', 'byId', index ]) }),
};
