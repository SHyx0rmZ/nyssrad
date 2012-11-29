#!/usr/bin/perl
###############################################################################
# Copyright (c) 2012 Alexander Kluth <derhartmut@niwohlos.org>                #
#                                                                             #
#  Permission is hereby granted,  free of charge,  to any  person obtaining a #
#  copy of this software and associated documentation files (the "Software"), #
#  to deal in the Software without restriction,  including without limitation #
#  the rights to use,  copy, modify, merge, publish,  distribute, sublicense, #
#  and/or sell copies  of the  Software,  and to permit  persons to whom  the #
#  Software is furnished to do so, subject to the following conditions:       #
#                                                                             #
#  The above copyright notice and this permission notice shall be included in #
#  all copies or substantial portions of the Software.                        #
#                                                                             #
#  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR #
#  IMPLIED, INCLUDING  BUT NOT  LIMITED TO THE WARRANTIES OF MERCHANTABILITY, #
#  FITNESS FOR A PARTICULAR  PURPOSE AND  NONINFRINGEMENT.  IN NO EVENT SHALL #
#  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER #
#  LIABILITY,  WHETHER IN AN ACTION OF CONTRACT,  TORT OR OTHERWISE,  ARISING #
#  FROM,  OUT OF  OR IN CONNECTION  WITH THE  SOFTWARE  OR THE  USE OR  OTHER #
#  DEALINGS IN THE SOFTWARE.                                                  #
###############################################################################
package Nyssrad;
use strict;
use warnings;
use JSON;
use LWP::Simple qw(!get);

my $json = JSON->new->allow_nonref;

sub new
{
    my ($class) = @_;
    my $self = {
        _port => undef
    };

    bless $self, $class;

    return $self;
}


sub get
{
    shift;

    my $url = 'http://localhost:$self->{_port}/get/';

    foreach (@_) {
        $url .= $_ . '/';
    }

    my $contents = LWP::Simple::get($url);

    return $json->decode($contents);
}


sub set
{
    my $key = $_[1];
    my $value = $_[2];

    my $url = 'http://localhost:8888/set/' . $key . '/' . $value;

    LWP::Simple::get($url);
}


sub getStore
{
    #TODO: 
    # foreach (keys %{$contents->{'response'}}) {
    #   print $_ . "\n";
    #   print $contents->{'response'}->{$_}->{'value'} . "\n";
    # }
    # -> Way too complicated...
    #
    my $content = $json->decode(LWP::Simple::get('http://localhost:8888/getstore'));
  
    return $content; 
}

