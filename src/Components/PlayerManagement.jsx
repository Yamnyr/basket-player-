import React, { useState, useEffect } from 'react';
import { PlayerService } from '../Services/PlayerService';
import './PlayerManagement.css';  // Importer le fichier CSS

const PlayerManagement = () => {
    const [players, setPlayers] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState({
        nom: '', age: '', equipe: '', position: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            const data = await PlayerService.getAllPlayers();
            setPlayers(data);
        } catch (error) {
            alert('Erreur de chargement des joueurs');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentPlayer({ ...currentPlayer, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await PlayerService.updatePlayer(currentPlayer.id, currentPlayer);
            } else {
                await PlayerService.addPlayer(currentPlayer);
            }
            fetchPlayers();
            setCurrentPlayer({ nom: '', age: '', equipe: '', position: '' });
            setIsEditing(false);
        } catch (error) {
            alert('Erreur lors de l\'enregistrement');
        }
    };

    const handleEdit = (player) => {
        setCurrentPlayer(player);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        try {
            await PlayerService.deletePlayer(id);
            fetchPlayers();
        } catch (error) {
            alert('Erreur lors de la suppression');
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>🏀 Gestion des Joueurs de Basket</h1>
            </div>

            <form onSubmit={handleSubmit} className="form-container">
                <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={currentPlayer.nom}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Âge"
                    value={currentPlayer.age}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                />
                <input
                    type="text"
                    name="equipe"
                    placeholder="Équipe"
                    value={currentPlayer.equipe}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                />
                <input
                    type="text"
                    name="position"
                    placeholder="Position"
                    value={currentPlayer.position}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                />
                <button
                    type="submit"
                    className="btn btn-add"
                >
                    {isEditing ? 'Modifier le Joueur' : 'Ajouter un Joueur'}
                </button>
            </form>

            <table className="player-table">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Âge</th>
                    <th>Équipe</th>
                    <th>Position</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {players.map((player) => (
                    <tr key={player.id}>
                        <td>{player.nom}</td>
                        <td>{player.age}</td>
                        <td>{player.equipe}</td>
                        <td>{player.position}</td>
                        <td className="action-btns">
                            <button
                                onClick={() => handleEdit(player)}
                                className="btn btn-edit"
                            >
                                Modifier
                            </button>
                            <button
                                onClick={() => handleDelete(player.id)}
                                className="btn btn-delete"
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerManagement;