import { rolesEnum } from '../../utils/enums/roles.js'
async function isSuperAdmin(req, res, next) {
  if (req.user.role.name !== rolesEnum.SUPERADMIN) {
    return res.json({
      status: 403,
      message: 'You are not authorized to perform this action',
    })
  }

  next()
}

export { isSuperAdmin }
