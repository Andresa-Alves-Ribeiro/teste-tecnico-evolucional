import React from 'react';
import { IconButton, Tooltip, alpha, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

type ActionType = 'edit' | 'save' | 'delete' | 'view';

interface ActionButtonProps {
  type: ActionType;
  onClick: () => void;
  disabled?: boolean;
  tooltip?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  onClick,
  disabled = false,
  tooltip,
}) => {
  const theme = useTheme();

  const getIcon = () => {
    switch (type) {
      case 'edit':
        return <EditIcon />;
      case 'save':
        return <SaveIcon />;
      case 'delete':
        return <DeleteIcon />;
      case 'view':
        return <VisibilityIcon />;
      default:
        return null;
    }
  };

  const getColor = () => {
    switch (type) {
      case 'edit':
        return theme.palette.primary.main;
      case 'save':
        return theme.palette.success.main;
      case 'delete':
        return theme.palette.error.main;
      case 'view':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getDefaultTooltip = () => {
    switch (type) {
      case 'edit':
        return 'Editar';
      case 'save':
        return 'Salvar';
      case 'delete':
        return 'Excluir';
      case 'view':
        return 'Visualizar';
      default:
        return '';
    }
  };

  return (
    <Tooltip title={tooltip || getDefaultTooltip()}>
      <IconButton
        onClick={onClick}
        disabled={disabled}
        size="small"
        sx={{
          color: getColor(),
          '&:hover': {
            backgroundColor: alpha(getColor(), 0.1),
          },
        }}
      >
        {getIcon()}
      </IconButton>
    </Tooltip>
  );
};

export default ActionButton; 