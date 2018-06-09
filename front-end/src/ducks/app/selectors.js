export default {
    selectPath: ( state ) => ({ path: state.getIn([ 'app', 'locationBeforeTransitions', 'pathname' ]) }),
    selectQueryParam: ( state, queryParam ) => (state.getIn([ 'app', 'locationBeforeTransitions', 'query' ])[ queryParam ]),
};
