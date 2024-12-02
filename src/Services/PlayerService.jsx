import axios from 'axios';

const API_URL = 'http://localhost:3001/players';

export const PlayerService = {
    // Récupérer tous les joueurs
    getAllPlayers: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des joueurs', error);
            throw error;
        }
    },

    // Récupérer un joueur par son ID
    getPlayerById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la récupération du joueur ${id}`, error);
            throw error;
        }
    },

    // Ajouter un nouveau joueur
    addPlayer: async (player) => {
        try {
            const response = await axios.post(API_URL, player);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'ajout du joueur', error);
            throw error;
        }
    },

    // Mettre à jour un joueur
    updatePlayer: async (id, player) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, player);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la mise à jour du joueur ${id}`, error);
            throw error;
        }
    },

    // Supprimer un joueur
    deletePlayer: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erreur lors de la suppression du joueur ${id}`, error);
            throw error;
        }
    }
};