!echo "======================"
!echo ${productName}
!echo "======================"

!macro customUnInstall
  MessageBox MB_YESNO "Do you want to delete user settings?" /SD IDNO IDNO SkipRemoval
    SetShellVarContext current
    RMDir /r "$APPDATA\book-wise"
  SkipRemoval:
!macroend