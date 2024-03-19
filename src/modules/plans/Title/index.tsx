import { Box, Button, DialogActions, Typography } from '@mui/material'
import React from 'react'
import { useSetRecoilState } from 'recoil'

//** Import State */
import { PLAN_MODAL_TYPES, updatePlanModalAtom } from '../UpdatePlanModal/store'
import useCan from '@/common/hooks/useCan'

const Title = () => {
  // ** Global State to Modal State NEW EDIT DELETE
  const setPlanModalState = useSetRecoilState(updatePlanModalAtom)

  const showAddPlan = () => {
    setPlanModalState(state => ({
      ...state,
      isOpen: true,
      type: PLAN_MODAL_TYPES.NEW,
      plan: null
    }))
  }

  return (
    <Box className="card-header">
      <h3 className="card-title">Manage Plans</h3>
      <DialogActions sx={{ pt: 1, pb: 1, pl: 0, pr: 0 }}>
        {/* <Button
          variant="contained"
          sx={{ "& svg": { mr: 2 }, borderRadius: "20px" }}
          style={{position: "absolute", right: "10px"}}
          onClick={showAddPlan}
        >
          <span style={{ fontSize: "1.125rem" }}></span>
          Create Plan
        </Button> */}
      </DialogActions>
    </Box>
  )
}

export default Title
