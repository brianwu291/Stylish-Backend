while getopts ":m:" option
do
  case "${option}" in
    newMigration ) m=${OPTARG}
      ;;
  esac
done

sequelize-mig migration:make \
    -n newMigration
