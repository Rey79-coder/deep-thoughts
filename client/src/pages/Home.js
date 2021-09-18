import React from 'react';
// This will allow us to make requests to the GraphQL server
import { useQuery } from '@apollo/client';
// QUERY_THOUGHTS query
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

import Auth from '../utils/auth';

import ThoughtList from '../components/ThoughtList';

import FriendList from '../components/FriendList';


const Home = () => {
    // use useQuery hook to make query request
    const { loading, data } = useQuery(QUERY_THOUGHTS);

    // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
    const { data: userData } = useQuery(QUERY_ME_BASIC);

    const thoughts = data?.thoughts || [];
    console.log(thoughts);

    const loggedIn = Auth.loggedIn();


    return (

        <main>
            <div className="flex-row justify-space-between">
                <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
                    )}
                </div>

                {loggedIn && userData ? (
                    <div className="col-12 col-lg-3 mb-3">
                        <FriendList
                            username={userData.me.username}
                            friendCount={userData.me.friendCount}
                            friends={userData.me.friends}
                        />
                    </div>
                    
                ) : null}
            </div>
        </main>

    );
};

export default Home;
