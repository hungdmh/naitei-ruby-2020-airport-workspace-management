class UserFormat < Grape::Entity
  expose :id
  expose :email
  expose :name
  expose :address
  expose :gender_name
  expose :position_name
  expose :unit_name
  expose :user_status_name
end
