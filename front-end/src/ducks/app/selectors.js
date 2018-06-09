export default {
    selectQueryId: ( state ) => ({ id: state.getIn([ 'app', 'locationBeforeTransitions', 'query', 'id' ]) }),
    selectPath: ( state ) => ({ path: state.getIn([ 'app', 'locationBeforeTransitions', 'pathname' ]) }),
    selectQuery: ( state ) => ({ query: state.getIn([ 'app', 'locationBeforeTransitions', 'query' ]) }),
};
