#!/bin/bash

SESSION_NAME="dev-servers"

# Crear sesión en modo silencioso
tmux new-session -d -s $SESSION_NAME

# Configurar para limpiar pantalla automáticamente
tmux set -t $SESSION_NAME -g pane-border-status off
tmux set -t $SESSION_NAME -g status off  # Oculta barra de estado también

# Panel 0: Backend - Método con clear instantáneo
tmux send-keys -t $SESSION_NAME:0 "clear && printf '\033[2J\033[3J\033[1;1H'" C-m
sleep 0.2  # Pequeña pausa para que clear se ejecute
tmux send-keys -t $SESSION_NAME:0 "cd Backend" C-m
tmux send-keys -t $SESSION_NAME:0 "npm run dev" C-m

# Dividir para Frontend
tmux split-window -h -t $SESSION_NAME:0

# Panel 1: Frontend - Método con escape sequence
tmux send-keys -t $SESSION_NAME:0.1 "printf '\033c'" C-m  # Limpia pantalla
sleep 0.2
tmux send-keys -t $SESSION_NAME:0.1 "cd Frontend" C-m
tmux send-keys -t $SESSION_NAME:0.1 "npm run dev" C-m

# Ajustar layout
tmux select-layout -t $SESSION_NAME even-horizontal

tmux attach -t $SESSION_NAME