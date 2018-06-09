export default {
    isFetching: ( state ) => ({ isFetching: state.getIn([ 'user', 'status', 'isFetching' ]) }),
};
