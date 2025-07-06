/**
 * English language strings for the Tennis App.
 * Organized by feature/component for better maintainability.
 *
 * @fileoverview Contains all English text strings used throughout the application
 * @author Your Name
 * @version 1.0.0
 */

export default {
    /**
     * Common strings used across multiple components
     */
    common: {
        loading: 'Loading...',
        error: 'An error occurred',
        retry: 'Retry',
        close: 'Close',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        search: 'Search',
        filter: 'Filter',
        clear: 'Clear',
        confirm: 'Confirm',
        yes: 'Yes',
        no: 'No',
        today: 'Today',
        yesterday: 'Yesterday',
        daysAgo: '{days} days ago',
        actions: 'Actions'
    },

    /**
     * Place-related strings
     */
    places: {
        /**
         * Place information dialog strings
         */
        infoDialog: {
            title: 'Place Information',
            fields: {
                id: 'ID',
                name: 'Name',
                address: 'Address',
                surface: 'Surface'
            },
            matches: {
                title: 'Matches played at this place',
                loading: 'Loading matches...',
                empty: 'No matches played at this place yet.',
                error: 'Failed to load matches',
                retry: 'Retry',
                columns: {
                    player1: 'Player 1',
                    player2: 'Player 2',
                    date: 'Date',
                    winner: 'Winner'
                },
                changePlace: 'Change place'
            },
            editPlace: {
                title: 'Change Match Place',
                currentPlace: 'Current place',
                newPlace: 'New place',
                selectPlace: 'Select a new place',
                updatePlace: 'Update Place',
                warning: 'This action will permanently change the place where this match was played. This cannot be undone.'
            }
        },
        /**
         * Places panel strings
         */
        panel: {
            title: 'Places',
            addButton: 'Add Place',
            editButton: 'Edit',
            deleteButton: 'Delete',
            noPlaces: 'No places found'
        }
    },

    /**
     * Match-related strings
     */
    matches: {
        /**
         * Matches panel strings
         */
        panel: {
            title: 'Últimos partidos', // Keep Spanish if that's your preference
            addButton: 'Add Match',
            columns: {
                player1: 'Jugador 1', // Keep Spanish if that's your preference
                player2: 'Jugador 2',
                place: 'Pista',
                result: 'Resultado'
            },
            loading: 'Loading matches...',
            empty: 'No matches found',
            error: 'Failed to load matches'
        },
        /**
         * Match info dialog strings
         */
        infoDialog: {
            title: 'Match Information',
            statistics: 'Statistics',
            sets: 'Sets',
            games: 'Games'
        }
    },

    /**
     * Player-related strings
     */
    players: {
        /**
         * Players panel strings
         */
        panel: {
            title: 'Players',
            addButton: 'Add Player',
            columns: {
                name: 'Name',
                ranking: 'Ranking',
                matches: 'Matches'
            }
        }
    },

    /**
     * Navigation and menu strings
     */
    navigation: {
        home: 'Home',
        players: 'Players',
        matches: 'Matches',
        places: 'Places',
        competitions: 'Competitions',
        statistics: 'Statistics'
    },

    /**
     * Form validation messages
     */
    validation: {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        minLength: 'Minimum length is {min} characters',
        maxLength: 'Maximum length is {max} characters',
        numeric: 'Please enter a valid number',
        positiveNumber: 'Please enter a positive number'
    },

    /**
     * Success and error messages
     */
    messages: {
        success: {
            saved: 'Data saved successfully',
            deleted: 'Data deleted successfully',
            updated: 'Data updated successfully',
            created: 'Data created successfully'
        },
        error: {
            saveFailed: 'Failed to save data',
            deleteFailed: 'Failed to delete data',
            updateFailed: 'Failed to update data',
            createFailed: 'Failed to create data',
            networkError: 'Network error occurred',
            serverError: 'Server error occurred',
            unknownError: 'An unknown error occurred'
        }
    }
} as const;
