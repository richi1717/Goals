import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import LoadingButton from '@mui/lab/LoadingButton'
import CloseIcon from '@mui/icons-material/Close'
import { useTheme } from '@mui/material/styles'
import { IconButton } from '@mui/material'

interface DialogProps extends Omit<MuiDialogProps, 'onSubmit'> {
  open: boolean
  title: string
  children: React.ReactElement
  buttonText: string
  showCancel?: boolean
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  onClose: () => void
  isPending?: boolean
}

export default function Dialog({
  open,
  title,
  children,
  showCancel = true,
  buttonText,
  onSubmit,
  onClose,
  isPending = false,
}: DialogProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('tablet'))

  return (
    <MuiDialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { minWidth: { tablet: 600 } },
        component: 'form',
        onSubmit,
      }}
    >
      <Stack
        sx={{ p: 3, pb: 0 }}
        justifyContent="space-between"
        direction="row"
      >
        <DialogTitle sx={{ m: 0, p: 0 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Stack>
      <DialogContent sx={{ pt: 3 }}>{children}</DialogContent>
      <DialogActions sx={{ pb: 3, px: 3, pt: 2 }}>
        {showCancel && (
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        )}
        <LoadingButton variant="contained" type="submit" loading={isPending}>
          {buttonText}
        </LoadingButton>
      </DialogActions>
    </MuiDialog>
  )
}
