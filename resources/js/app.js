/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

const Intercooler = require("intercooler");
window.Intercooler = Intercooler;

// Components
require("./components/global");
require("./components/userForm");
require("./components/userModal");
require("./components/passwordForm");
require("./components/loadingModal");

