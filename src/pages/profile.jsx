import React from "react";
import { Link } from "react-router-dom"; 
import '../styles/profile.css';

function Profile() {
    return (
        <section id="account" className="mb-4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card bg-light p-4">
                            <h3 className="mb-4">Bağışçı Bilgileriniz</h3>
                            <ul className="list-unstyled account-options ms-2 ng-star-inserted">
                                <li>
                                    <Link to="/bilgilerim">
                                        <i className="fa fa-eye me-1" aria-hidden="true"></i>
                                        Bilgilerim
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/kanbagislarim">
                                        <i className="fa fa-heartbeat me-1" aria-hidden="true"></i> Kan Bağışlarım
                                    </Link>
                                </li>
                               
                                {}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;