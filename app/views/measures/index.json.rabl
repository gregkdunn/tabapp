object false

child @accents => :accents do
  attributes :id, :name, :symbol 
end

child @chords => :chords do
  attributes :id, :name, :notes
end

child @fingers => :fingers do
  attributes :id, :name, :symbol 
end

child @intruments => :instruments do
  attributes :id, :name, :strings
end

child @states => :states do 
  attributes :id, :name
end

child @time_signatures => :time_signatures do
  attributes :id, :lower, :upper 
end

child @measures => :measures do
  attributes :id, :data
end